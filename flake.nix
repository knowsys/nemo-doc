{
  description = "documentation for nemo, a datalog-based rule engine for fast and scalable analytic data processing in memory";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
    utils.url = "github:gytis-ivaskevicius/flake-utils-plus";

    dream2nix = {
      url = "github:nix-community/dream2nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    inputs@{
      self,
      utils,
      dream2nix,
      ...
    }:
    utils.lib.mkFlake {
      inherit self inputs;

      overlays = {
        default =
          final: prev:
          let
            pkgs = self.packages.${final.system};
          in
          {
            inherit (pkgs) nemo-doc;
          };
      };

      outputsBuilder =
        channels:
        let
          pkgs = channels.nixpkgs;

          npmMeta = builtins.fromJSON (builtins.readFile ./package.json);
          inherit (npmMeta) version;

          paths = {
            paths = {
              projectRoot = ./.;
              projectRootFile = "flake.nix";
              package = ./.;
            };
          };

          nemo-doc = dream2nix.lib.evalModules {
            packageSets.nixpkgs = pkgs;

            modules = [
              paths

              (
                {
                  lib,
                  config,
                  dream2nix,
                  ...
                }:
                {
                  name = "nemo-doc";
                  inherit version;

                  imports = [
                    dream2nix.modules.dream2nix.nodejs-package-lock-v3
                    dream2nix.modules.dream2nix.nodejs-granular-v3
                  ];

                  mkDerivation = {
                    src = ./.;

                    installPhase = ''
                      runHook preInstall

                      cp -R dist $out

                      runHook postInstall
                    '';

                    nativeBuildInputs = [ config.deps.pagefind ];
                  };

                  deps =
                    { nixpkgs, ... }:
                    {
                      inherit (nixpkgs) nodejs pagefind writeShellApplication;
                    };

                  nodejs-package-lock-v3 = {
                    packageLockFile = "${config.mkDerivation.src}/package-lock.json";
                  };

                  nodejs-granular-v3 = {
                    buildScript =
                      let
                        # wrap npx, since the starlight integration
                        # insists on invoking pagefind by calling `npx
                        # -y pagefind […]`, which breaks in the
                        # sandbox, as the registry is unavailable.
                        npx = config.deps.writeShellApplication {
                          name = "npx";

                          runtimeInputs = [
                            config.deps.nodejs
                          ];

                          text = ''
                            if [ "$2" = "pagefind" ]; then
                              /build/package/.bin/pagefind "''${@:3}"
                            else
                              ${config.deps.nodejs}/bin/npx "$@"
                            fi
                          '';
                        };
                      in
                      ''
                        export NODE_OPTIONS=--max_old_space_size=4096
                        export ASTRO_TELEMETRY_DISABLED=1
                        export PATH="${npx}/bin:''${PATH}"

                        npm --offline run build
                      '';
                  };
                }
              )
            ];

          };
        in
        {
          apps =
            let
              nemo-doc-preview = utils.lib.mkApp {
                drv = pkgs.writeShellApplication {
                  name = "nemo-doc-preview";

                  runtimeInputs = [
                    pkgs.nodejs
                  ];

                  text = ''
                    export ASTRO_TELEMETRY_DISABLED=1

                    cd ${self.packages.${pkgs.system}.nemo-doc}/lib/node_modules/nemo-doc/
                    node_modules/astro/astro.js preview
                  '';
                };
              };
            in
            {
              inherit nemo-doc-preview;
              default = nemo-doc-preview;

              check-links =
                let
                  ignoreUrls = [
                    "http://xmlns.com/foaf/spec/" # no HTTPS
                    "https://knowsys.github.io/nemo-doc/404/" # returns 404 by design
                  ];
                in
                utils.lib.mkApp {
                  drv = pkgs.writeShellScriptBin "check-links" ''
                    LANG="C.UTF-8" ${pkgs.html-proofer}/bin/htmlproofer \
                    --allow-hash-href \
                    --assume-extension \
                    --empty-alt-ignore \
                    --ignore-status-codes 401 \
                    --ignore-urls ${pkgs.lib.concatStringsSep "," ignoreUrls} \
                    ${self.packages.${pkgs.system}.nemo-doc}/dist/
                  '';
                };
            };

          packages = {
            inherit nemo-doc;
            default = nemo-doc;
          };

          devShells.default = dream2nix.lib.evalModules {
            packageSets.nixpkgs = pkgs;

            modules = [
              {
                paths = {
                  projectRoot = ./.;
                  projectRootFile = "flake.nix";
                  package = ./.;
                };
              }
              (
                {
                  lib,
                  config,
                  dream2nix,
                  ...
                }:
                {
                  name = "nemo-web";
                  inherit version;

                  imports = [
                    dream2nix.modules.dream2nix.nodejs-package-lock-v3
                    dream2nix.modules.dream2nix.nodejs-devshell-v3
                  ];

                  env = {
                    ASTRO_TELEMETRY_DISABLED = 1;
                    PAGEFIND_BINARY_PATH = lib.getExe config.deps.pagefind;
                  };

                  deps =
                    { nixpkgs, ... }:
                    {
                      inherit (nixpkgs) nodejs pagefind;
                      inherit (nixpkgs.nodePackages) prettier;
                    };

                  mkDerivation = {
                    src = ./.;

                    nativeBuildInputs = lib.attrValues {
                      inherit (config.deps) nodejs pagefind prettier;
                    };

                    buildPhase = "mkdir $out";
                  };

                  nodejs-package-lock-v3 = {
                    packageLockFile = "${config.mkDerivation.src}/package-lock.json";
                  };
                }
              )
            ];
          };

          formatter = channels.nixpkgs.nixfmt-rfc-style;
        };

    };

}

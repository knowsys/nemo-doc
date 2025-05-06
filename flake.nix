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

          # meta = {
          #   inherit description;
          #   homepage = npmMeta.repository.url;
          # };

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
                  };

                  nodejs-package-lock-v3 = {
                    packageLockFile = "${config.mkDerivation.src}/package-lock.json";
                  };

                  nodejs-granular-v3 = {
                    buildScript = "NODE_OPTIONS=--max_old_space_size=4096 npm run build";
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
                    cd ${self.packages.${pkgs.system}.nemo-doc}/lib/node_modules/nemo-doc/
                    node_modules/astro/astro.js preview
                  '';
                };
              };
            in
            {
              inherit nemo-doc-preview;
              default = nemo-doc-preview;
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

                  mkDerivation = {
                    src = ./.;

                    nativeBuildInputs = lib.attrValues {
                      inherit (pkgs) nodejs;
                      inherit (pkgs.nodePackages) prettier;
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

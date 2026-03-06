{
  description = "Vidi example — deploy to Cloudflare Pages";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    wrangler.url = "github:emrldnix/wrangler";
    vidi.url = "path:../";
  };

  outputs = inputs@{ flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      perSystem = { pkgs, inputs', self', ... }:
        let
          projectName = "vidi-srid";
          wranglerPkg = inputs'.wrangler.packages.default;
          vidiSite = inputs'.vidi.packages.default;
          site = pkgs.runCommand "${projectName}-site" {} ''
            cp -r ${vidiSite} $out
            chmod -R u+w $out
            cp ${./phrases.md} $out/phrases.md
          '';
          mkApp = drv: { type = "app"; program = "${drv}/bin/${drv.name}"; };
        in {
          packages.default = site;

          apps.create = mkApp (pkgs.writeShellApplication {
            name = "create";
            runtimeInputs = [ wranglerPkg ];
            text = ''
              wrangler pages project create ${projectName}
            '';
          });

          apps.deploy = mkApp (pkgs.writeShellApplication {
            name = "deploy";
            runtimeInputs = [ wranglerPkg ];
            text = ''
              wrangler pages deploy ${site} --project-name ${projectName}
            '';
          });

          devShells.default = pkgs.mkShell {
            packages = [ wranglerPkg ];
          };
        };
    };
}

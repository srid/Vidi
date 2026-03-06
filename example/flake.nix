{
  description = "Vidi example — deploy to Cloudflare Pages";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    wrangler.url = "github:emrldnix/wrangler";
    vidi.url = "path:../";
  };

  outputs = { self, nixpkgs, flake-utils, wrangler, vidi }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        vidiSite = vidi.packages.${system}.default;
        # Overlay example phrases onto the built site
        site = pkgs.runCommand "vidi-site" {} ''
          cp -r ${vidiSite} $out
          chmod -R u+w $out
          cp ${./phrases.md} $out/phrases.md
        '';
      in {
        packages.default = site;

        apps.deploy = {
          type = "app";
          program = "${pkgs.writeShellApplication {
            name = "deploy";
            runtimeInputs = [
              wrangler.packages.${system}.default
            ];
            text = ''
              # First, `wrangler login`
              wrangler pages deploy ${site} --project-name vidi
            '';
          }}/bin/deploy";
        };

        devShells.default = pkgs.mkShell {
          packages = [
            wrangler.packages.${system}.default
          ];
        };
      });
}

{
  description = "Vidi — minimalist PWA for voluntary silence";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
  };

  outputs = inputs@{ flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      perSystem = { pkgs, ... }: {
        packages.default = pkgs.buildNpmPackage {
          pname = "vidi";
          version = "1.0.0";
          src = ./.;
          npmDepsHash = "sha256-l3g9T21eBQ4atSvVz6v3EwwxgyJSY8pUunQgOqP9mgE=";
          installPhase = ''
            runHook preInstall
            cp -r dist $out
            runHook postInstall
          '';
        };

        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_22
            just
          ];
        };
      };
    };
}

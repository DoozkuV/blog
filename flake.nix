# A flake defining a bun/astrojs project
{
  description = "Bun/AstroJS development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            bun
            nodejs_20
            nodePackages.typescript
            nodePackages.typescript-language-server
          ];
        };

        # Example for adding a simple package if needed
        packages.default = pkgs.stdenv.mkDerivation {
          name = "astro-app";
          src = self;
          
          buildInputs = with pkgs; [
            bun
            nodejs_20
          ];
          
          buildPhase = ''
            export HOME=$(mktemp -d)
            bun install
            bun run build
          '';
          
          installPhase = ''
            mkdir -p $out
            cp -r dist/* $out/
          '';
        };
      }
    );
}

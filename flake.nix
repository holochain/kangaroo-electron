{
  description = "Dev tools";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

    flake-parts.url = "github:hercules-ci/flake-parts";
  };

  outputs = inputs@{ flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [ "x86_64-linux" "aarch64-linux" "aarch64-darwin" ];
      perSystem =
        { inputs'
        , config
        , pkgs
        , ...
        }:
        {
          formatter = pkgs.nixpkgs-fmt;

          devShells.default = pkgs.mkShell {
            packages = with pkgs; [
              yarn
            ];
          };
        };
    };
}

# Stupid-lsp

Handles if chars were not closed

- This lsp server is made to help close brackets, parentheses, etc.
- **Alert** this LSP server can be a little insulting

![Image describing the LSP](https://i.ibb.co/b7FYNrW/pic-selected-220520-2247-50.png)

## Requirements

- NodeJs _lts_

## Installation

for now, the unique way to install it is from the source so clone the lsp
into a folder that you can still access later `git clone https://github.com/joao-vitor-sr/stupid-lsp.git ./folder`
and install running `yarn`, and then `yarn build`, the binary will be in the _./bin_ folder

### Runing from NeoVim

to run the _stupid-lsp_ from NeoVim lsp you can use:

```
if not configs.stupid_lsp then
    configs.stupid_lsp = {
        default_config = {
            cmd = {
                '<path_to_the_stupid_lsp>/bin/stupid-lsp', '--stdio'
            },
            filetypes = {'javascript', '<any_other_language>'},
            root_dir = require('lspconfig').util.find_git_ancestor,
        }
    }
end
```

## Known issues

the stupid-LSP is arbitrary about the language, this is good for simplicity, and also it's good to be able to run it in any language.
but how it's arbitrary there are some issues.

- the stupid-LSP can't detect if the parentheses or brackets are a string or not, so let's say that you have something like this `if (a == '(')` the server will return an error because the server can't detect that the open parenthesis is a string and it's not to be validated.

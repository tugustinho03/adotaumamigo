# 🐾 Patinhas — Adoção de Animais (React)

Aplicação React de adoção de animais: listagem, página de detalhe, pesquisa/filtros (tipo, raça, localização), favoritos e página "Sobre". Imagens obtidas via Dog CEO API e The Cat API.

## Correr localmente
```bash
npm install
npm run dev
```

## Publicar no GitHub Pages
```bash
git init && git add . && git commit -m "Patinhas"
git branch -M main
git remote add origin https://github.com/<utilizador>/adocao-animais.git
git push -u origin main
npm run deploy
```
Depois: GitHub → Settings → Pages → Branch `gh-pages` / root.
Link final: `https://<utilizador>.github.io/adocao-animais/`

# Acervo interno · Check-in

Página estática com os documentos e planilhas de apoio ao check-in. Não precisa de build nem de servidor: basta abrir o `index.html`.

## Estrutura

```
index.html        Conteúdo (lista de arquivos por categoria)
css/estilo.css    Estilos: tokens → base → layout → componentes → utilitários (BEM)
js/acervo.js      Busca e contadores (opcional: a página funciona sem ele)
arquivos/         Os arquivos disponibilizados
```

## Adicionar um arquivo

1. Coloque o arquivo na pasta `arquivos/`.
2. No `index.html`, copie um `<li class="file-card">` da categoria certa e ajuste:
   - `data-type`: `xlsx`, `docx` ou `pdf` (define a cor do selo);
   - `href`: caminho do arquivo. Troque espaços por `%20`. Acentos podem ficar como estão, desde que o arquivo seja salvo em UTF-8;
   - o título e o texto da ação (`Baixar planilha`, `Baixar documento` ou `Abrir PDF`).
3. PDFs usam `target="_blank" rel="noopener"` (abrem no navegador). Planilhas e documentos Word usam `download`.

Os contadores e a busca se atualizam sozinhos.

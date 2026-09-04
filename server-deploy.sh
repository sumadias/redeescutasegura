#!/bin/sh
# Roda no servidor da HostGator (via cron): copia o build já baixado pelo git
# para a pasta pública do domínio adicional. A branch "deploy" contém apenas o
# resultado do build (dist/) + este script.
SRC="$HOME/redeescutasegura-deploy"

# Descobre o docroot do domínio adicional. Prioridade:
#   1) variável DEPLOY_DEST (se definida no cron)
#   2) primeiro caminho padrão do cPanel que já exista (o cPanel cria a pasta
#      do addon domain ao adicioná-lo)
#   3) fallback para o layout mais comum
if [ -n "$DEPLOY_DEST" ]; then
  DEST="$DEPLOY_DEST"
else
  DEST=""
  for cand in \
    "$HOME/public_html/redeescutasegura.com.br" \
    "$HOME/public_html/redeescutasegura" \
    "$HOME/redeescutasegura.com.br" \
    "$HOME/public_html/redeescutasegura.com.br/public_html"; do
    if [ -d "$cand" ]; then DEST="$cand"; break; fi
  done
  DEST="${DEST:-$HOME/public_html/redeescutasegura.com.br}"
fi

mkdir -p "$DEST"

if command -v rsync >/dev/null 2>&1; then
  rsync -a --exclude=.git --exclude=server-deploy.sh "$SRC/" "$DEST/"
else
  cp -a "$SRC/." "$DEST/"
  rm -rf "$DEST/.git" "$DEST/server-deploy.sh"
fi

# A pagina temporaria da HostGator (index.php) teria prioridade sobre o
# index.html do site; remove apenas se for mesmo a pagina placeholder.
if [ -f "$DEST/index.php" ] && grep -qi "hostgator" "$DEST/index.php"; then
  rm -f "$DEST/index.php"
fi

echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] deploy OK -> $DEST"

#!/bin/sh
# Roda no servidor da HostGator (via cron): copia o build já baixado pelo git
# para a pasta pública do domínio adicional. A branch "deploy" contém apenas o
# resultado do build (dist/) + este script.
#
# O docroot do domínio adicional pode variar; por isso o destino é
# parametrizável pela variável DEPLOY_DEST definida no cron. O padrão abaixo
# cobre o layout usual de domínio adicional no cPanel.
SRC="$HOME/redeescutasegura-deploy"
DEST="${DEPLOY_DEST:-$HOME/public_html/redeescutasegura.com.br}"

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

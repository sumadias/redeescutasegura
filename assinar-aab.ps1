# Cria a keystore de upload e assina o AAB do Rede Escuta Segura.
#
# A SENHA E GERADA POR ESTE SCRIPT, na sua maquina, no momento em que voce o
# executa. Voce nao precisa inventar, digitar nem colar senha nenhuma.
# Ela e gravada em senha-keystore.txt, ao lado da keystore.
#
# O Claude nao gera e nao ve essa senha: ela nasce aqui, no seu computador.
#
# Rode com:
#   powershell -ExecutionPolicy Bypass -File .\assinar-aab.ps1

$ErrorActionPreference = "Stop"

$projeto   = "C:\Users\Dell\Projetos\redeescutasegura"
$jdk       = "C:\Users\Dell\android-tools\jdk17"
$keystore  = Join-Path $projeto "android.keystore"
$senhaFile = Join-Path $projeto "senha-keystore.txt"
$aabIn     = Join-Path $projeto "app\build\outputs\bundle\release\app-release.aab"
$aabOut    = Join-Path $projeto "app-release-bundle.aab"
$alias     = "android"

Set-Location $projeto

if (-not (Test-Path $aabIn)) {
  Write-Host "AAB nao encontrado em $aabIn" -ForegroundColor Red
  Write-Host "Rode antes:  .\gradlew.bat bundleRelease --no-daemon" -ForegroundColor Yellow
  exit 1
}

# ------------------------------------------------------------------- senha
if (Test-Path $keystore) {
  if (-not (Test-Path $senhaFile)) {
    Write-Host "A keystore existe mas senha-keystore.txt sumiu." -ForegroundColor Red
    Write-Host "Sem a senha nao da para assinar. Recupere-a ou apague a" -ForegroundColor Red
    Write-Host "keystore para gerar outra (so faca isso se o app ainda NAO" -ForegroundColor Red
    Write-Host "foi publicado)." -ForegroundColor Red
    exit 1
  }
  Write-Host "Keystore ja existe. Reutilizando." -ForegroundColor Cyan
  $senha = (Get-Content $senhaFile -Raw).Trim()
} else {
  Write-Host "Gerando senha de 24 caracteres..." -ForegroundColor Cyan

  # Apenas letras e numeros: a senha e passada como argumento para o keytool
  # e o jarsigner, e simbolos como $ ou " seriam interpretados pelo shell no
  # meio do caminho — a chave ficaria com uma senha diferente da gravada.
  $rng   = [System.Security.Cryptography.RandomNumberGenerator]::Create()
  $chars = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789".ToCharArray()
  $bytes = New-Object byte[] 24
  $rng.GetBytes($bytes)
  $senha = -join ($bytes | ForEach-Object { $chars[$_ % $chars.Length] })

  Set-Content -Path $senhaFile -Value $senha -Encoding ascii -NoNewline
  Write-Host "Senha gravada em senha-keystore.txt" -ForegroundColor Green

  Write-Host "Criando a chave de assinatura..." -ForegroundColor Cyan
  $dn = "CN=Rede Escuta Segura, O=Nous Inovacao e Tecnologia, L=Cabedelo, ST=PB, C=BR"

  & "$jdk\bin\keytool.exe" -genkeypair `
      -keystore $keystore -alias $alias `
      -keyalg RSA -keysize 2048 -validity 10000 `
      -storepass $senha -keypass $senha -dname $dn | Out-Null

  if ($LASTEXITCODE -ne 0) {
    Write-Host "Falha ao criar a keystore." -ForegroundColor Red
    Remove-Item $senhaFile -ErrorAction SilentlyContinue
    exit 1
  }
  Write-Host "Keystore criada." -ForegroundColor Green
}

# -------------------------------------------------------------- assinatura
Write-Host "Assinando o pacote..." -ForegroundColor Cyan
Copy-Item $aabIn $aabOut -Force

& "$jdk\bin\jarsigner.exe" -sigalg SHA256withRSA -digestalg SHA-256 `
    -keystore $keystore -storepass $senha $aabOut $alias | Out-Null

if ($LASTEXITCODE -ne 0) { Write-Host "Falha ao assinar." -ForegroundColor Red; exit 1 }

$ok = (& "$jdk\bin\jarsigner.exe" -verify $aabOut) -match "jar verified"
if (-not $ok) { Write-Host "A assinatura nao verificou." -ForegroundColor Red; exit 1 }

$tam = [math]::Round((Get-Item $aabOut).Length / 1MB, 2)

Write-Host ""
Write-Host "PRONTO - assinatura verificada" -ForegroundColor Green
Write-Host "  Pacote:  app-release-bundle.aab ($tam MB)"
Write-Host "  Chave:   android.keystore"
Write-Host "  Senha:   senha-keystore.txt"
Write-Host ""
Write-Host "AGORA, ANTES DE QUALQUER OUTRA COISA:" -ForegroundColor Yellow
Write-Host "  Copie android.keystore e senha-keystore.txt para fora desta" -ForegroundColor Yellow
Write-Host "  maquina (pendrive, gerenciador de senhas, nuvem privada)." -ForegroundColor Yellow
Write-Host "  Sem os dois, o app nunca mais podera ser atualizado." -ForegroundColor Yellow
Write-Host ""
Write-Host "Os dois arquivos estao no .gitignore e nao vao para o GitHub." -ForegroundColor Cyan

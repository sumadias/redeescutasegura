# Cria a keystore de upload e assina o AAB do Rede Escuta Segura.
#
# A senha e digitada AQUI, no seu terminal. Ela nao passa pelo Claude, nao vai
# para o chat e nao fica gravada em lugar nenhum deste script.
#
# Rode com:  powershell -ExecutionPolicy Bypass -File .\assinar-aab.ps1

$ErrorActionPreference = "Stop"

$projeto  = "C:\Users\Dell\Projetos\redeescutasegura"
$jdk      = "C:\Users\Dell\android-tools\jdk17"
$keystore = Join-Path $projeto "android.keystore"
$aabIn    = Join-Path $projeto "app\build\outputs\bundle\release\app-release.aab"
$aabOut   = Join-Path $projeto "app-release-bundle.aab"
$alias    = "android"

Set-Location $projeto

if (-not (Test-Path $aabIn)) {
  Write-Host "AAB nao encontrado em $aabIn" -ForegroundColor Red
  Write-Host "Rode antes:  .\gradlew.bat bundleRelease --no-daemon" -ForegroundColor Yellow
  exit 1
}

# ---------------------------------------------------------------- keystore
if (Test-Path $keystore) {
  Write-Host "Keystore ja existe em $keystore — vou reutiliza-la." -ForegroundColor Cyan
} else {
  Write-Host ""
  Write-Host "=== Criando a chave de assinatura ===" -ForegroundColor Cyan
  Write-Host "Esta chave prova que as atualizacoes do app vem de voces."
  Write-Host "Escolha uma senha de no minimo 6 caracteres e GUARDE-A."
  Write-Host ""

  $senha1 = Read-Host "Senha da keystore" -AsSecureString
  $senha2 = Read-Host "Repita a senha"     -AsSecureString

  $p1 = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
          [Runtime.InteropServices.Marshal]::SecureStringToBSTR($senha1))
  $p2 = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
          [Runtime.InteropServices.Marshal]::SecureStringToBSTR($senha2))

  if ($p1 -ne $p2)      { Write-Host "As senhas nao conferem." -ForegroundColor Red; exit 1 }
  if ($p1.Length -lt 6) { Write-Host "Minimo de 6 caracteres." -ForegroundColor Red; exit 1 }

  $dn = "CN=Rede Escuta Segura, O=Nous Inovacao e Tecnologia, L=Cabedelo, ST=PB, C=BR"

  & "$jdk\bin\keytool.exe" -genkeypair `
      -keystore $keystore -alias $alias `
      -keyalg RSA -keysize 2048 -validity 10000 `
      -storepass $p1 -keypass $p1 -dname $dn

  if ($LASTEXITCODE -ne 0) { Write-Host "Falha ao criar a keystore." -ForegroundColor Red; exit 1 }
  Write-Host "Keystore criada." -ForegroundColor Green
}

# ---------------------------------------------------------------- assinatura
Write-Host ""
Write-Host "=== Assinando o pacote ===" -ForegroundColor Cyan
$senha = Read-Host "Senha da keystore" -AsSecureString
$ps = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
        [Runtime.InteropServices.Marshal]::SecureStringToBSTR($senha))

Copy-Item $aabIn $aabOut -Force

& "$jdk\bin\jarsigner.exe" -verbose:false `
    -sigalg SHA256withRSA -digestalg SHA-256 `
    -keystore $keystore -storepass $ps `
    $aabOut $alias

if ($LASTEXITCODE -ne 0) { Write-Host "Falha ao assinar." -ForegroundColor Red; exit 1 }

# ---------------------------------------------------------------- conferencia
Write-Host ""
Write-Host "=== Conferindo ===" -ForegroundColor Cyan
& "$jdk\bin\jarsigner.exe" -verify $aabOut | Select-Object -First 3

Write-Host ""
Write-Host "PRONTO: $aabOut" -ForegroundColor Green
Write-Host ""
Write-Host "Guarde uma copia de android.keystore E da senha fora desta maquina." -ForegroundColor Yellow
Write-Host "Sem elas, o app nunca mais podera ser atualizado." -ForegroundColor Yellow

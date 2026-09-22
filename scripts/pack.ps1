$timestamp = (Get-Date).ToString("yyyyMMdd_HHmmss")
$zipName = "dist_$timestamp.zip"
$zipPath = Join-Path (Get-Location) $zipName
Compress-Archive -Path "dist\*" -DestinationPath $zipPath -Force
Write-Output "ZIP_CREATED:$zipPath"

# PowerShell script to fix HTML entity encoding issues
$filePath = "d:\OneDrive - 55phcx\portfolio\case-studies\fmcg-erp-case-study.html"

# Read the file
$content = Get-Content -Path $filePath -Raw -Encoding UTF8

# Replace all the corrupted entities
$content = $content -replace '&ldquo;', '"'
$content = $content -replace '&rdquo;', '"'
$content = $content -replace '&rsquo;', "'"
$content = $content -replace '&mdash;', '—'
$content = $content -replace '&ndash;', '–'
$content = $content -replace 'Ã‚Â·', '·'
$content = $content -replace 'Ã‚Â©', '©'

# Write the fixed content back
Set-Content -Path $filePath -Value $content -Encoding UTF8 -NoNewline

Write-Host "File fixed successfully!"

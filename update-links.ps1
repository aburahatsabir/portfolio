# Find and replace all hash-based hrefs with clean URLs
$files = Get-ChildItem -Path "components" -Filter "*.tsx" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Replace all hash-based hrefs
    $content = $content -replace 'href="/#/', 'href="/'
    $content = $content -replace "href='/#/", "href='/"
    
    Set-Content -Path $file.FullName -Value $content -NoNewline
}

Write-Host "Updated all component links to use clean URLs"

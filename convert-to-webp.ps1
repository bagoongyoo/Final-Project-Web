# Path to cwebp executable
$cwebpPath = "C:\Program Files\libwebp-1.5.0-windows-x64\bin\cwebp.exe"

# Check if cwebp exists at the specified path
if (-not (Test-Path $cwebpPath)) {
    Write-Error "cwebp not found at $cwebpPath. Please make sure libwebp is installed correctly."
    exit 1
}

# Set the target directory
$targetDir = Join-Path (Get-Location) "assets\img"

# Check if target directory exists
if (-not (Test-Path $targetDir)) {
    Write-Error "Target directory not found: $targetDir"
    exit 1
}

# Rename files to match index.html references
$renameMap = @{
    "galeri kendaraan.webp" = "galeri-kendaraan.webp"
    "produk-1.jpg" = "produk-1.webp"
    "produk-2.jpg" = "produk-2.webp"
    "produk-3.jpg" = "produk-3.webp"
    "distribusi-1.jpg" = "distribusi-1.webp"
    "distribusi-2.jpg" = "distribusi-2.webp"
    "es-kristal.jpg" = "es-kristal.webp"
}

foreach ($oldName in $renameMap.Keys) {
    $oldPath = Join-Path $targetDir $oldName
    $newPath = Join-Path $targetDir $renameMap[$oldName]
    
    if (Test-Path $oldPath) {
        Write-Host "Renaming $oldName to $($renameMap[$oldName])"
        Rename-Item -Path $oldPath -NewName $renameMap[$oldName] -Force
    }
}

# Get all PNG files in the target directory
$pngFiles = Get-ChildItem -Path $targetDir -Filter "*.png"

if ($pngFiles.Count -eq 0) {
    Write-Host "No PNG files found in directory: $targetDir"
    exit 0
}

Write-Host "Found $($pngFiles.Count) PNG files to convert"
Write-Host "Target directory: $targetDir"

foreach ($file in $pngFiles) {
    $outputFile = [System.IO.Path]::ChangeExtension($file.FullName, "webp")
    Write-Host "`nConverting: $($file.Name)"
    Write-Host "Output will be saved to: $outputFile"
    
    try {
        & $cwebpPath -q 80 $file.FullName -o $outputFile
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Successfully converted $($file.Name) to WebP"
        } else {
            Write-Error "Failed to convert $($file.Name)"
        }
    } catch {
        Write-Error "Error converting $($file.Name): $_"
    }
}

Write-Host "`nConversion complete!"
Write-Host "All WebP files have been saved in: $targetDir" 
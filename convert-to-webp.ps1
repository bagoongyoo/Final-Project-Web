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
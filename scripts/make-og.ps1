Add-Type -AssemblyName System.Drawing

$width = 1200
$height = 630
$bmp = New-Object System.Drawing.Bitmap $width, $height
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# Background: Pale Green #F1F6F3
$bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(241, 246, 243))
$g.FillRectangle($bgBrush, 0, 0, $width, $height)

# Elegant Gold Border
$borderPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(197, 162, 93), 8)
$g.DrawRectangle($borderPen, 4, 4, $width - 8, $height - 8)

$innerBorderPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(209, 231, 221), 2)
$g.DrawRectangle($innerBorderPen, 18, 18, $width - 36, $height - 36)

# Soft decorative ambient circle
$glowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(35, 23, 100, 74))
$g.FillEllipse($glowBrush, 850, -100, 450, 450)

# Load Logo
$logoPath = "c:\Users\sidar\Desktop\nncwa\public\nam-nilam-logo.png"
if (Test-Path $logoPath) {
    $logoImg = [System.Drawing.Image]::FromFile($logoPath)
    $logoBgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
    $g.FillEllipse($logoBgBrush, 80, 65, 100, 100)
    $logoRingPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(197, 162, 93), 3)
    $g.DrawEllipse($logoRingPen, 80, 65, 100, 100)
    $g.DrawImage($logoImg, 88, 73, 84, 84)
    $logoImg.Dispose()
}

# Brand Tag Pill
$pillBg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
$pillBorder = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(197, 162, 93), 2)
$g.FillRectangle($pillBg, 205, 90, 320, 50)
$g.DrawRectangle($pillBorder, 205, 90, 320, 50)

$brandFont = New-Object System.Drawing.Font ("Segoe UI", 15, [System.Drawing.FontStyle]::Bold)
$brandBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(12, 56, 42))
$g.DrawString("NAM NILAM WHATSAPP AI", $brandFont, $brandBrush, 220, 102)

# Main Title: "Nam Nilam WhatsApp AI" & "Let AI Talk to Your Customers on WhatsApp"
$titleFont = New-Object System.Drawing.Font ("Segoe UI", 40, [System.Drawing.FontStyle]::Bold)
$titleBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(15, 23, 42))
$titleRect = New-Object System.Drawing.RectangleF (80, 195, 1040, 150)
$g.DrawString("Let AI Talk to Your Customers`non WhatsApp", $titleFont, $titleBrush, $titleRect)

# Subtitle
$subTitleFont = New-Object System.Drawing.Font ("Segoe UI", 19, [System.Drawing.FontStyle]::Regular)
$subTitleBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(51, 65, 85))
$subTitleRect = New-Object System.Drawing.RectangleF (80, 355, 1040, 80)
$g.DrawString("Connect your WhatsApp with AI and let Nam Nilam AI handle customer conversations, enquiries, follow-ups, and business communication 24/7.", $subTitleFont, $subTitleBrush, $subTitleRect)

# Feature Badges
$badgeFont = New-Object System.Drawing.Font ("Segoe UI", 14, [System.Drawing.FontStyle]::Bold)
$badgeBg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
$badgeBorder = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(209, 231, 221), 2)
$badgeTextBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(12, 56, 42))

$badges = @("24/7 Instant Responses", "Human Takeover Anytime", "Connect in Minutes")
$badgeX = 80
foreach ($b in $badges) {
    $size = $g.MeasureString($b, $badgeFont)
    $w = [int]$size.Width + 36
    $g.FillRectangle($badgeBg, $badgeX, 455, $w, 50)
    $g.DrawRectangle($badgeBorder, $badgeX, 455, $w, 50)
    $g.DrawString($b, $badgeFont, $badgeTextBrush, ($badgeX + 18), 468)
    $badgeX += $w + 20
}

# Footer Bar inside OG image
$footerBg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(12, 56, 42))
$g.FillRectangle($footerBg, 18, 545, 1164, 67)

$footerFont = New-Object System.Drawing.Font ("Segoe UI", 15, [System.Drawing.FontStyle]::Bold)
$footerBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(241, 246, 243))
$goldBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(234, 179, 8))
$g.DrawString("Official WhatsApp: +91 97876 00221", $footerFont, $goldBrush, 45, 566)
$g.DrawString("wa.namnilam.com", $footerFont, $footerBrush, 960, 566)

# Save
$outPath = "c:\Users\sidar\Desktop\nncwa\public\og-image.png"
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
Write-Output "SUCCESS: OG image created at $outPath"

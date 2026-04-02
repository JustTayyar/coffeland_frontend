$jsxPath = 'c:\xampp\htdocs\CoffeeLand\coffeeland_frontend\src\pages\ShopAdmin\Products\Products.jsx'
$jsxContent = Get-Content $jsxPath -Raw
$jsxContent = $jsxContent -replace 'if \(dropdownRef.current && !dropdownRef.current.contains\(event.target\)\)', 'if (!event.target.closest(''.premium-dropdown-container''))'
Set-Content $jsxPath -Value $jsxContent -Encoding UTF8

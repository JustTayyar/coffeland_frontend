$jsxPath = 'c:\xampp\htdocs\CoffeeLand\coffeeland_frontend\src\pages\ShopAdmin\Products\Products.jsx'
$jsxContent = Get-Content $jsxPath -Raw

$statePattern = 'const \[currentProduct, setCurrentProduct\] = useState\(null\);'
$stateReplacement = "const [currentProduct, setCurrentProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);"
$jsxContent = $jsxContent -replace $statePattern, $stateReplacement

$oldDelete = '  const handleDelete = async (id) => {
    if(window.confirm(''Bu məhsulu silməyə əminsiniz?'')) {
      try {
        await AdminProductService.delete(id);
        fetchProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };'

$newDelete = '  const openDeleteModal = (id) => {
    setProductToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const confirmDelete = async () => {
    if(!productToDelete) return;
    try {
      await AdminProductService.delete(productToDelete);
      fetchProducts();
      closeDeleteModal();
    } catch (err) {
      console.error(err);
    }
  };'

$jsxContent = $jsxContent.Replace($oldDelete, $newDelete)

$oldButton = '<button className="btn-delete" onClick={() => handleDelete(p.id)}><FaTrash /></button>'
$newButton = '<button className="btn-delete" onClick={() => openDeleteModal(p.id)}><FaTrash /></button>'
$jsxContent = $jsxContent.Replace($oldButton, $newButton)

$oldModalEnd = '        </div>
      )}
    </div>
  );
}'

$newModalEnd = '        </div>
      )}

      {isDeleteModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content" style={{ maxWidth: ''400px'', textAlign: ''center'', padding: ''35px'' }}>
            <div style={{ fontSize: ''3rem'', color: ''#ef4444'', marginBottom: ''15px'' }}><FaTrash /></div>
            <h3 style={{ color: ''#fff'', marginBottom: ''15px'', fontSize: ''1.4rem'', fontWeight: 600 }}>Diqqət!</h3>
            <p style={{ color: ''#d4d4d8'', marginBottom: ''30px'', fontSize: ''1.05rem'', lineHeight: ''1.5'' }}>
              Siz bu məhsulu silmək istədiyinizə əminsinizmi?
            </p>
            <div className="admin-modal-actions" style={{ justifyContent: ''center'', marginTop: ''0'', paddingTop: ''0'', borderTop: ''none'' }}>
              <button type="button" className="admin-btn-secondary" onClick={closeDeleteModal}>Xeyr</button>
              <button type="button" className="admin-btn-danger" onClick={confirmDelete}>Bəli</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}'

$jsxContent = $jsxContent.Replace($oldModalEnd, $newModalEnd)

Set-Content -Path $jsxPath -Value $jsxContent -Encoding UTF8

$cssPath = 'c:\xampp\htdocs\CoffeeLand\coffeeland_frontend\src\pages\ShopAdmin\Products\Products.css'
$cssContent = Get-Content $cssPath -Raw
$dangerBtnCss = '

.admin-btn-danger {
  background: #ef4444; 
  color: white; 
  border: none; 
  padding: 12px 28px; 
  border-radius: 8px; 
  cursor: pointer; 
  font-weight: 600; 
  transition: all 0.3s;
  font-size: 1.05rem;
}
.admin-btn-danger:hover {
  background: #dc2626;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
}'

$cssContent += $dangerBtnCss
Set-Content -Path $cssPath -Value $cssContent -Encoding UTF8

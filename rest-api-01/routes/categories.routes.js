app.get('/categories/:categoryId/productos/:productId',(req,res)=>{
  const {categoryId,ProductId}= req.params;
  res.json({
    categoryId,
    ProductId
  });
})

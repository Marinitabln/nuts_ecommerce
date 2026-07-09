import ProductsGrid from '@/components/products/ProductsGrid'
import Container from '@/components/ui/Container'


const ofertas = () => {
  return (
     <Container >
      <div className='mt-20'>
        <h2 className='text-primary text-3xl font-bold'>OFERTAS</h2>
        <p className='pt-6 pb-10 leading-8'>Explorá nuestra línea de productos envasados, seleccionados para sumar <span className='font-semibold'>sabor, calidad y practicidad </span>a tu cocina.
        <br />Encontrá opciones ideales para acompañar tus comidas, preparar recetas o incorporar hábitos más saludables todos los días.</p>
        <ProductsGrid selectedCategory={"doy packs"} />
      </div>
    </Container>
  )
}

export default ofertas

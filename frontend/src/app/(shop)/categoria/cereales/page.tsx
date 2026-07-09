import ProductsGrid from '@/components/products/ProductsGrid'
import Container from '@/components/ui/Container'


const cereales = () => {
  return (
    <Container >
      <div className='mt-20'>
        <h2 className='text-primary text-3xl font-bold'>Cereales</h2>
        <p className='pt-6 pb-10 leading-8'>Descubrí nuestra selección de cereales pensada para acompañarte en cada momento del día. Encontrá opciones <span className='font-semibold'>nutritivas, crocantes y llenas de sabor.</span>
          <br />Ideales para desayunos, meriendas o para sumar energía a tus recetas favoritas</p>
        <ProductsGrid selectedCategory={"cereales"} />
      </div>
    </Container>
  )
}

export default cereales

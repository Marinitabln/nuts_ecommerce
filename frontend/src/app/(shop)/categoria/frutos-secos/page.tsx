import ProductsGrid from '@/components/products/ProductsGrid'
import Container from '@/components/ui/Container'


const frutosSecos = () => {
    return (
        <Container >
            <div className='mt-20'>
                <h2 className='text-primary text-3xl font-bold'>Frutos secos</h2>
                <p className='pt-6 pb-10 leading-8'>Disfrutá de nuestra variedad de frutos secos, ideales para sumar <span className='font-semibold'>energía, sabor y nutrición</span> a tu día.
                    <br />Perfectos para snacks, desayunos, recetas o para llevar a donde quieras. Una opción natural y deliciosa para cualquier momento.</p>
                <ProductsGrid selectedCategory={"frutos secos"} />
            </div>
        </Container>
    )
}

export default frutosSecos
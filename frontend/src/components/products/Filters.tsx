import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import Container from '../ui/Container';

const categories = [
    "cereales",
    "semillas",
    "frutos secos",
    "productos envasados",
    "doy packs",
    "combos"
];

interface FiltersProps {
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
}

const Filters = ({ selectedCategory, setSelectedCategory }: FiltersProps) => {

    return (
        <Container >
            <div className='mb-4 mx-auto'>
                <section className="flex flex-wrap gap-3 mb-4 justify-center max-w-[250px] sm:max-w-[450px] md:max-w-[650px] lg:max-w-4xl">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            onClick={() =>
                                setSelectedCategory(category)
                            }
                            variant={
                                selectedCategory === category
                                    ? "primary"
                                    : "outline"
                            }
                        >
                            {category}
                        </Button>
                    ))}
                </section>
                {selectedCategory && <button className="flex items-center gap-2" onClick={() => setSelectedCategory(null)}><X /> Borrar filtros</button>}
            </div>
        </Container>
    )
}

export default Filters

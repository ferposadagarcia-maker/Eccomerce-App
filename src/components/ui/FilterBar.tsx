interface FilterBarProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const CATEGORIES = [
    { id: 'all', label: 'Colección Completa' },
    { id: 'anillos', label: 'Anillos' },
    { id: 'collares', label: 'Collares' },
    { id: 'pulseras', label: 'Pulseras' },
];

export const FilterBar = ({ selectedCategory, onSelectCategory }: FilterBarProps) => {
    return (
        <nav className="category-bar">
            {CATEGORIES.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className={selectedCategory === cat.id ? 'active' : ''}
                >
                    {cat.label}
                </button>
            ))}
        </nav>
    );
};
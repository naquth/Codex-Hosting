import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
  const { count } = useCart();
  return (
    <Link
      to="/cart"
      className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/[0.06]"
    >
      <ShoppingCart size={20} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;

import { Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../../context/ShoppingCartContact";
import storeItems from "../../data/items.json";
import { formatCurrency } from "../../utilities/formatCurrency";

type CardItemProps = {
  id: number;
  quantity: number;
};

const CardItem = ({ id, quantity }: CardItemProps) => {
  const { removeFromCart } = useShoppingCart();
  const item = storeItems.find((i) => i.id === id);

  if (item === null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item?.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
        alt="cartimg"
      />

      <div className="me-auto">
        <div>
          {item?.name}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>

        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {item?.price && formatCurrency(item?.price)}
        </div>
      </div>
      <div>{ item?.price&& formatCurrency(item?.price * quantity)} </div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() =>{
          if(item?.id){
            removeFromCart(item?.id)
          }
         
        }
         
          }
      >
        &times;
      </Button>
    </Stack>
  );
};

export default CardItem;


import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../Store/slices/cartSlice";


export const Step1 = () => {

    const dispatch = useDispatch();
    const  cart = useSelector(state=>state.cart)
  return (
      <>
          <div 
          className="container"
    
          >
            <div className="d-flex justify-content-between p-5">
              <h1 className="">
                Your order
              </h1>
              <button
                onClick={() => dispatch(clearCart())}
                className="btn btn-dark  "
              >
                clear the cart
              </button>
            </div>
    
            <div className="overflow-y-scroll overflow-x-hidden table-scroll border border-primar " style={{height:'470px',scrollbarColor:''}}>
              <table className=" table    " >
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart &&cart.map((item, index) => (
                    <tr
                      key={item.id * index * index * 10000}
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.name}
                      </th>
                      <td className="px-6 py-4">{item.category}</td>
                      <td className="px-6 py-4">{item.quantity}</td>
                      <td className="px-6 py-4">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-semibold text-gray-900 dark:text-white">
                    <th scope="row" className="px-6 py-3 text-base">
                      Total
                    </th>
                    <td></td>
                    <td className="px-6 py-3">
                      {cart.reduce((total, item) => total + item.quantity, 0)}
                    </td>
                    <td className="px-6 py-3">
                      $
                      {cart
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>      
      </>
  );
};

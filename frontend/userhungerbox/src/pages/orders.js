import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const socket = io('http://localhost:8080', {
  transports: ['websocket'],
});

socket.emit('joinroom', Cookies.get('hotelname'));

export default function Orders() {
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on('order', (message) => {
      setData(prevData => [...prevData, message]); // Correctly append message to the data array
    });

    // Clean up event listener when component unmounts
    return () => {
      socket.off('order');
    };
  }, []); // Empty dependency array to ensure effect runs only once

  return (
    <div>
      {
        data.map((e , index)=>(
            
            <div key={index}>
                Order by : {e.user}
                <div>
                Order :
              {
                e.order.map((e , index)=>(
                  <div key={index}>{e}</div>
                ))
              }
                </div>
            </div>
        ))
      }
    </div>
  );
}

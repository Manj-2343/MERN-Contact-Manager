import React from 'react';

interface IProps{
    heading :string ;
}

const DisplayHeading:React.FC<IProps> = (props)=> {
  return (
   <>
<div className='container mt-3'>
        <div className='row'>
            <div className='col'>
                <p className='h3 text-danger'>{props.heading}</p>
                 <p className='lead'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat numquam consequuntur modi! Assumenda, excepturi voluptatum? Provident pariatur est ipsam doloribus, inventore doloremque autem, cumque sapiente reiciendis amet voluptatum corporis ab!</p>
            </div>
        </div>
    </div>
   </>
  )
};
export default DisplayHeading;

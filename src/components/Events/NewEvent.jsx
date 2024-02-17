import { Link, useNavigate } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation } from '@tanstack/react-query';
import { createNewEvent, queryClient } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function NewEvent() {
  const navigate = useNavigate();
const {mutate,isPending,error,isError}=useMutation({
  mutationFn: createNewEvent,
  onSuccess:()=>{
    // inavlidating here mark the one query as stale and get a new one as latest one  here 
    queryClient.invalidateQueries({queryKey:['events']})
    navigate('/events');
  }
})
// post and get all the data  such as posting and getting related queries we can do mapping on each other such as invalidation query as transtack query method has  
// we do that in query client class 
// passing data function as a value  
  function handleSubmit(formData) {
    //mutate function is for passing the value to the pointer function i.e createNewEvent
    mutate({event:formData})
    // navigate('/events')

  }

  // let content;

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'Submitting....'}
        {
          !isPending &&
        <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>

        </>
}
      </EventForm>
      {isError && <ErrorBlock title="An error has occured." message={error.info?.message} />}
    </Modal>
  );
}

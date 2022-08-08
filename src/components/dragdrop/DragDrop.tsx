import MovieItem from 'components/item/Item'
import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import store from 'store'
import { IFav } from 'types/movie'

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: '0 0 0 20px',
  margin: `0px 0px 15px 0px`,
  background: isDragging ? '#4a2975' : 'gray',
  color: isDragging ? 'white' : 'black',
  ...draggableStyle,
})

const DragDrop = () => {
  const [todo, setTodo] = useState(store.get('fav'))

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return

    const items = Array.from(todo)
    const [newOrder] = items.splice(source.index, 1)
    items.splice(destination.index, 0, newOrder)
    setTodo(items)
    store.set('fav', todo)
  }
  return (
    <div className='App'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='todo'>
          {(provided) => (
            <ul className='todo' {...provided.droppableProps} ref={provided.innerRef}>
              {todo.map((movie: IFav, index: number) => {
                return (
                  <Draggable key={movie.Id} draggableId={movie.Id} index={index}>
                    {(provide, snapshot) => (
                      <div
                        ref={provide.innerRef}
                        {...provide.draggableProps}
                        {...provide.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provide.draggableProps.style)}
                      >
                        <MovieItem key={`movie-${movie.Title}-${movie.imdbID}`} item={movie} />
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                )
              })}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default DragDrop

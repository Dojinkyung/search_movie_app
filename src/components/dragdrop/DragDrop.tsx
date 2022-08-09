import { CheckIcon } from 'assets/svgs'
import MovieItem from 'components/item/Item'
import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import store from 'store'
import { IFav } from 'types/movie'
import styles from './DragDrop.module.scss'

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  margin: `0px 0px 15px 0px`,
  ...draggableStyle,
})

const DragDrop = () => {
  const [item, setItem] = useState(store.get('fav'))

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return

    const items = Array.from(item)
    const [newOrder] = items.splice(source.index, 1)
    items.splice(destination.index, 0, newOrder)
    setItem(items)
    store.set('fav', items)
  }
  return (
    <div className={styles.DragDrop}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='item'>
          {(provided) => (
            <div className={styles.favoriteMovie} {...provided.droppableProps} ref={provided.innerRef}>
              {item.map((movie: IFav, index: number) => {
                return (
                  <Draggable key={movie.Id} draggableId={movie.Id} index={index}>
                    {(provide, snapshot) => (
                      <div
                        ref={provide.innerRef}
                        {...provide.draggableProps}
                        {...provide.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provide.draggableProps.style)}
                      >
                        <CheckIcon className={styles.icon} />
                        <MovieItem key={`movie-${movie.Title}-${movie.imdbID}`} item={movie} />
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                )
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default DragDrop

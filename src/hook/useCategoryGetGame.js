import { useCallback, useEffect, useState } from 'react'
import gameListAPI from '@/services/game/gameList'
import { useBoolean } from './use-boolean'
import { filter, includes, map, pipe, prop } from 'ramda'

function useCategoryGetGame(categoryType, originalDataList) {
  const {
    value: apiIsLoading,
    onTrue: setApiIsLoadingTrue,
    onFalse: setApiIsLoadingFalse,
  } = useBoolean(false)
  const [list, setList] = useState([])

  const onFetchGameList = useCallback(async () => {
    try {
      setApiIsLoadingTrue()

      const response = await gameListAPI({
        game_type: categoryType,
      })()

      const formatData = pipe(
        filter((item) => includes(item.agent_id, originalDataList.map(prop('agentId')))),
        map((item) => originalDataList.find((original) => original.agentId === item.agent_id))
      )(response.list || [])

      setList(formatData)
    } catch (error) {
      console.error(error)
    } finally {
      setApiIsLoadingFalse()
    }
  }, [categoryType, originalDataList, setApiIsLoadingFalse, setApiIsLoadingTrue])

  useEffect(() => {
    onFetchGameList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    isLoading: apiIsLoading,
    list,
  }
}

export default useCategoryGetGame

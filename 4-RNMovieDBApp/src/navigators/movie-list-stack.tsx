import React, { PropsWithChildren } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
  PopularMoviesScreen,
  NowPlayingMoviesScreen,
  MovieDetailScreen
} from '@/screens'
import type { TMovieListStackParamList } from './types'

const MovieListStack = createNativeStackNavigator<TMovieListStackParamList>()

function WrapperNavigator({ children }: PropsWithChildren) {
  return (
    <MovieListStack.Navigator screenOptions={{ headerBackTitle: '' }}>
      {children}
      <MovieListStack.Screen
        options={({ route: { params } }) => ({ title: params.title })}
        name="MovieDetails"
        component={MovieDetailScreen}
      />
    </MovieListStack.Navigator>
  )
}

export function PopularMoviesStackNavigator() {
  return (
    <WrapperNavigator>
      <MovieListStack.Screen
        options={{ title: 'Popular Movies' }}
        name="MovieList"
        component={PopularMoviesScreen}
      />
    </WrapperNavigator>
  )
}

export function NowPlayingMoviesStackNavigator() {
  return (
    <WrapperNavigator>
      <MovieListStack.Screen
        options={{ title: 'Now Playing' }}
        name="MovieList"
        component={NowPlayingMoviesScreen}
      />
    </WrapperNavigator>
  )
}

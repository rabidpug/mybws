import App from './App.container'
import React from 'react'
import { shallow, } from 'enzyme'
import toJson from 'enzyme-to-json'

describe( 'App Container', () => {
  const AppContainer = () => shallow( <App /> )

  //======== TEST SHALLOW RENDERING ========//
  // it( 'has a TouchableOpacity classname', () => {
  //   expect( appButton().find( 'TouchableOpacity' ).length ).toEqual( 1 );
  // } );

  // it( 'has ActivityIndicator when state loading true', () => {
  //   const wrapper = appButton().setState( { loading: true, } );

  //   expect( wrapper.find( 'ActivityIndicator' ).length ).toEqual( 1 );
  // } );

  // it( 'has no ActivityIndicator when state loading false', () => {
  //   const wrapper = appButton().setState( { loading: false, } );

  //   expect( wrapper.find( 'ActivityIndicator' ).length ).toEqual( 0 );
  // } );

  // it( 'has no Text when state loading false', () => {
  //   const wrapper = appButton().setState( { loading: false, } );

  //   expect( wrapper.find( 'Text' ).length ).toEqual( 1 );
  // } );

  //======== TEST SNAPSHOT =========//
  it( 'should match the snapshot', () => {
    expect( toJson( AppContainer() ) ).toMatchSnapshot()
  } )

  // it( 'snapshot when state loading is true', () => {
  //   const wrapper = appButton().setState( { loading: true, } );

  //   expect( toJson( wrapper ) ).toMatchSnapshot();
  // } );
} )

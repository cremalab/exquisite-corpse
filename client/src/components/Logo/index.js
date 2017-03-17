import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 1em;
  height: 1em;
  border: 1px solid currentColor;
  border-radius: 50%;
  text-align: center;
  line-height: 1em;
  position: relative;
  color: currentColor;
  font-size: 1.2em;
`

const Eye = styled.div`
  width: .4em;
  height: .4em;
  fill: currentColor;
  position: absolute;
  top: .2em;
  font-size: .4em;
`

const LeftEye = styled(Eye)`
  left: .2em;
`
const RightEye = styled(Eye)`
  right: .2em;
`

const Mouth = styled.div`
  width: .1em;
  height: .15em;
  background-color: currentColor;
  border-radius: 50%;
  position: absolute;
  top: .7em;
  left: 50%;
  margin-left: -0.05em;
`

const Face = styled.svg`
  width: 1.4em;
  height: 1.4em;
  fill: currentColor;
`

function Logo() {
  return <div>
    <Face xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M10.001.4C4.698.4.4 4.698.4 10c0 5.303 4.298 9.601 9.601 9.601 5.301 0 9.6-4.298 9.6-9.601-.001-5.302-4.3-9.6-9.6-9.6zM10 17.599c-4.197 0-7.6-3.402-7.6-7.6 0-4.197 3.402-7.6 7.6-7.6 4.197 0 7.6 3.402 7.6 7.6 0 4.198-3.403 7.6-7.6 7.6zm2.501-7.849c.828 0 1.5-.783 1.5-1.75s-.672-1.75-1.5-1.75-1.5.783-1.5 1.75.671 1.75 1.5 1.75zm-5 0c.828 0 1.5-.783 1.5-1.75s-.672-1.75-1.5-1.75-1.5.783-1.5 1.75.671 1.75 1.5 1.75zm2.501 1.5c-3.424 0-4.622 2.315-4.672 2.414-.186.371-.035.821.335 1.007.108.053.222.079.335.079.275 0 .54-.151.672-.414.008-.017.822-1.586 3.33-1.586 2.463 0 3.298 1.527 3.328 1.585.184.37.635.523 1.006.336.371-.184.521-.636.336-1.006-.049-.099-1.246-2.415-4.67-2.415z"/>
    </Face>
  </div>
}

export default Logo;

import Flexio from './flexio'

// expose component to global scope
if (typeof window !== 'undefined') {
  window.Flexio = Flexio
}

export { Flexio }

export default Flexio

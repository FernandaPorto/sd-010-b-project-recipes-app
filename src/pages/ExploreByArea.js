import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class ExploreByArea extends Component {
  render() {
    return (
      <>
        <section>
          <Header title="Explorar Origem" />
        </section>
        <footer data-testid="footer">
          <Footer />
        </footer>
      </>
    );
  }
}

export default ExploreByArea;

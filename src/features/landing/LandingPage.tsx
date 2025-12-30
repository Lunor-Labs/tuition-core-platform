import React from 'react';
import { Navbar, Teacher, Channels } from '../../shared/components';
import {
  Hero,
  Success,
  Centers,
  Process,
  Discussion,
  Topstudent,
  Gallery,
  Reviews,
} from './components';

const LandingPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Success />
      <Centers />
      <Process />
      <Teacher />
      <Discussion />
      <Topstudent />
      <Gallery />
      <Reviews />
      <Channels />
    </>
  );
};

export default LandingPage;


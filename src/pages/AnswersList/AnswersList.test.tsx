import { render, act, waitFor } from '@testing-library/react';

import { SocketContextProviderMockSuccess } from '../../../__mocks__/SocketContextMock';

import AnswersListPage from './AnswersListPage';
import answers from '../../../__mocks__/answers';

import { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks();

describe('AnswersListPage Component', () => {

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should render component', async () => {
    await act(() => {
      fetchMock.mockResponseOnce(JSON.stringify(answers));

      const { container } = render(
        <SocketContextProviderMockSuccess>
          <AnswersListPage />
        </SocketContextProviderMockSuccess >
      );

      expect(container).toBeDefined();
    });
  });

  it('should render loading while data is fetching', async () => {
    await act(() => {
      fetchMock.mockResponseOnce(JSON.stringify(answers));

      const { getByTestId } = render(
        <SocketContextProviderMockSuccess>
          <AnswersListPage />
        </SocketContextProviderMockSuccess >
      );

      expect(getByTestId("loader")).toBeDefined();
    });
  });

  it('should render header text and answerslist components after data fetched', async () => {
    await act(async () => {
      fetchMock.mockResponseOnce(JSON.stringify(answers));

      const { container, getByText, getByTestId } = render(
        <SocketContextProviderMockSuccess>
          <AnswersListPage />
        </SocketContextProviderMockSuccess >
      );

      expect(getByText("Live answers")).toBeDefined();

      await waitFor(() => expect(getByTestId("answers-list")).toBeDefined());

      expect(container).toBeDefined();
    });
  });
});
import { useThemeColor } from '@/theme';
import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from '../Text';

// Mock the theme hook
jest.mock('@/theme', () => ({
  useThemeColor: jest.fn(),
}));

const mockUseThemeColor = useThemeColor as jest.MockedFunction<
  typeof useThemeColor
>;

describe('<Text />', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockUseThemeColor.mockReturnValue('#000000');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders children text correctly', () => {
      const { getByText } = render(<Text>Hello World</Text>);
      expect(getByText('Hello World')).toBeTruthy();
    });

    it('renders with default type when no type is specified', () => {
      const { getByText } = render(<Text>Default Text</Text>);
      const textElement = getByText('Default Text');
      expect(textElement).toBeTruthy();
      expect(textElement.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            fontSize: 16,
            lineHeight: 24,
          }),
        ])
      );
    });

    it('forwards all text props correctly', () => {
      const { getByText } = render(
        <Text
          numberOfLines={2}
          ellipsizeMode='tail'
          accessible={true}
          accessibilityLabel='Test Label'
        >
          Test Text
        </Text>
      );
      const textElement = getByText('Test Text');
      expect(textElement.props.numberOfLines).toBe(2);
      expect(textElement.props.ellipsizeMode).toBe('tail');
      expect(textElement.props.accessible).toBe(true);
      expect(textElement.props.accessibilityLabel).toBe('Test Label');
    });
  });

  describe('Text Types', () => {
    it('renders default type with correct styles', () => {
      const { getByText } = render(<Text type='default'>Default Text</Text>);
      const textElement = getByText('Default Text');
      expect(textElement.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            fontSize: 16,
            lineHeight: 24,
          }),
        ])
      );
    });

    it('renders title type with correct styles', () => {
      const { getByText } = render(<Text type='title'>Title Text</Text>);
      const textElement = getByText('Title Text');
      expect(textElement.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            fontSize: 32,
            fontWeight: 'bold',
            lineHeight: 32,
          }),
        ])
      );
    });

    it('renders defaultSemiBold type with correct styles', () => {
      const { getByText } = render(
        <Text type='defaultSemiBold'>SemiBold Text</Text>
      );
      const textElement = getByText('SemiBold Text');
      expect(textElement.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            fontSize: 16,
            lineHeight: 24,
            fontWeight: '600',
          }),
        ])
      );
    });

    it('renders subtitle type with correct styles', () => {
      const { getByText } = render(<Text type='subtitle'>Subtitle Text</Text>);
      const textElement = getByText('Subtitle Text');
      expect(textElement.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            fontSize: 20,
            fontWeight: 'bold',
          }),
        ])
      );
    });

    it('renders link type with correct styles', () => {
      const { getByText } = render(<Text type='link'>Link Text</Text>);
      const textElement = getByText('Link Text');
      expect(textElement.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            lineHeight: 30,
            fontSize: 16,
            color: '#0a7ea4',
          }),
        ])
      );
    });
  });

  describe('Theme Color Integration', () => {
    it('calls useThemeColor with correct parameters for default colors', () => {
      render(<Text>Test</Text>);
      expect(mockUseThemeColor).toHaveBeenCalledWith(
        { light: undefined, dark: undefined },
        'text'
      );
    });

    it('calls useThemeColor with custom light and dark colors', () => {
      const lightColor = '#ffffff';
      const darkColor = '#000000';
      render(
        <Text lightColor={lightColor} darkColor={darkColor}>
          Test
        </Text>
      );
      expect(mockUseThemeColor).toHaveBeenCalledWith(
        { light: lightColor, dark: darkColor },
        'text'
      );
    });

    it('applies theme color to text style', () => {
      const themeColor = '#ff0000';
      mockUseThemeColor.mockReturnValue(themeColor);

      const { getByText } = render(<Text>Themed Text</Text>);
      const textElement = getByText('Themed Text');
      expect(textElement.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            color: themeColor,
          }),
        ])
      );
    });

    it('applies custom light color when provided', () => {
      const customLightColor = '#blue';
      render(<Text lightColor={customLightColor}>Test</Text>);
      expect(mockUseThemeColor).toHaveBeenCalledWith(
        { light: customLightColor, dark: undefined },
        'text'
      );
    });

    it('applies custom dark color when provided', () => {
      const customDarkColor = '#darkblue';
      render(<Text darkColor={customDarkColor}>Test</Text>);
      expect(mockUseThemeColor).toHaveBeenCalledWith(
        { light: undefined, dark: customDarkColor },
        'text'
      );
    });
  });

  describe('Style Handling', () => {
    it('applies custom style along with type styles', () => {
      const customStyle = { marginTop: 10, backgroundColor: 'red' };
      const { getByText } = render(
        <Text type='title' style={customStyle}>
          Styled Text
        </Text>
      );
      const textElement = getByText('Styled Text');
      expect(textElement.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            fontSize: 32,
            fontWeight: 'bold',
            lineHeight: 32,
          }),
          customStyle,
        ])
      );
    });

    it('handles undefined style gracefully', () => {
      const { getByText } = render(<Text style={undefined}>No Style</Text>);
      const textElement = getByText('No Style');
      expect(textElement).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty text content', () => {
      const { root } = render(<Text></Text>);
      expect(root).toBeTruthy();
    });

    it('handles null children', () => {
      const { root } = render(<Text>{null}</Text>);
      expect(root).toBeTruthy();
    });

    it('handles undefined children', () => {
      const { root } = render(<Text>{undefined}</Text>);
      expect(root).toBeTruthy();
    });

    it('handles number children', () => {
      const { getByText } = render(<Text>{42}</Text>);
      expect(getByText('42')).toBeTruthy();
    });

    it('handles boolean children', () => {
      const { root } = render(<Text>{true}</Text>);
      expect(root).toBeTruthy();
    });
  });

  describe('Type Combinations with Colors', () => {
    it('combines title type with custom colors correctly', () => {
      const lightColor = '#lightTitle';
      const darkColor = '#darkTitle';
      mockUseThemeColor.mockReturnValue('#resolvedTitle');

      const { getByText } = render(
        <Text type='title' lightColor={lightColor} darkColor={darkColor}>
          Title with Custom Colors
        </Text>
      );

      expect(mockUseThemeColor).toHaveBeenCalledWith(
        { light: lightColor, dark: darkColor },
        'text'
      );

      const textElement = getByText('Title with Custom Colors');
      const styles = textElement.props.style;

      // Check that styles array contains our expected style objects
      expect(styles).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ color: '#resolvedTitle' }),
          expect.objectContaining({
            fontSize: 32,
            fontWeight: 'bold',
            lineHeight: 32,
          }),
        ])
      );
    });

    it('combines link type with custom colors correctly', () => {
      const lightColor = '#lightLink';
      const darkColor = '#darkLink';
      mockUseThemeColor.mockReturnValue('#resolvedLink');

      const { getByText } = render(
        <Text type='link' lightColor={lightColor} darkColor={darkColor}>
          Link with Custom Colors
        </Text>
      );

      const textElement = getByText('Link with Custom Colors');
      const styles = textElement.props.style;

      // Check that styles contains both theme color and link styles
      expect(styles).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ color: '#resolvedLink' }),
          expect.objectContaining({
            lineHeight: 30,
            fontSize: 16,
            color: '#0a7ea4', // Link's default color
          }),
        ])
      );
    });
  });

  describe('Complex Style Scenarios', () => {
    it('handles complex style override scenarios', () => {
      const customStyle = {
        fontSize: 50, // Override default fontSize
        color: 'purple', // Override theme color
        fontWeight: 'normal' as const, // Override bold
      };

      const { getByText } = render(
        <Text type='title' style={customStyle}>
          Override Title
        </Text>
      );

      const textElement = getByText('Override Title');
      const styles = textElement.props.style;

      // The custom style should be applied last, so it should override previous styles
      expect(styles).toEqual(expect.arrayContaining([customStyle]));
    });

    it('preserves all React Native Text props', () => {
      const textProps = {
        selectable: true,
        testID: 'custom-text',
        onPress: jest.fn(),
        onLongPress: jest.fn(),
        adjustsFontSizeToFit: true,
        minimumFontScale: 0.5,
      };

      const { getByTestId } = render(
        <Text {...textProps}>Interactive Text</Text>
      );

      const textElement = getByTestId('custom-text');
      expect(textElement.props.selectable).toBe(true);
      expect(textElement.props.onPress).toBe(textProps.onPress);
      expect(textElement.props.onLongPress).toBe(textProps.onLongPress);
      expect(textElement.props.adjustsFontSizeToFit).toBe(true);
      expect(textElement.props.minimumFontScale).toBe(0.5);
    });
  });
});

import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Card } from '@lib/ui/components/Card';
import { Grid } from '@lib/ui/components/Grid';
import { Icon } from '@lib/ui/components/Icon';
import { Row } from '@lib/ui/components/Row';
import { StatefulMenuView } from '@lib/ui/components/StatefulMenuView';
import { Text } from '@lib/ui/components/Text';
import { useStylesheet } from '@lib/ui/hooks/useStylesheet';
import { Theme } from '@lib/ui/types/Theme';

import { GlobalStyles } from '../../../core/styles/GlobalStyles';
import { StatisticsFilters } from '../utils/computeStatisticsFilters';

export const CourseStatisticsFilters = ({
  teachers,
  years,
  onTeacherChanged,
  onYearChanged,
  currentYear,
  currentTeacher,
}: StatisticsFilters & {
  onTeacherChanged: (teacherId: string) => void;
  onYearChanged: (year: string) => void;
}) => {
  const { t } = useTranslation();
  const styles = useStylesheet(createStyles);
  return (
    <Card padded accessible style={styles.container}>
      <Grid gap={10}>
        <View style={GlobalStyles.grow}>
          <Text
            accessibilityLabel={t('courseStatisticsScreen.period')}
            style={styles.label}
          >
            {t('courseStatisticsScreen.period')}
          </Text>
          <StatefulMenuView
            onPressAction={({ nativeEvent }) => {
              onYearChanged(nativeEvent.event);
            }}
            actions={years}
            disabled={years.length === 1}
          >
            <Row>
              <Text
                accessibilityLabel={currentYear?.title ?? '--'}
                style={styles.dropdownText}
                weight="semibold"
              >
                {currentYear?.title ?? '--'}
              </Text>
              <Icon icon={faChevronDown} style={styles.chevronStyle} />
            </Row>
          </StatefulMenuView>
        </View>
        <View style={GlobalStyles.grow}>
          <Text
            style={styles.label}
            accessibilityLabel={t('courseStatisticsScreen.teacher')}
          >
            {t('courseStatisticsScreen.teacher')}
          </Text>
          <StatefulMenuView
            onPressAction={({ nativeEvent }) => {
              onTeacherChanged(nativeEvent.event);
            }}
            actions={teachers}
          >
            <Row>
              <Text
                style={styles.dropdownText}
                accessibilityLabel={currentTeacher?.title ?? '--'}
                weight="semibold"
              >
                {currentTeacher?.title ?? '--'}
              </Text>
              <Icon icon={faChevronDown} style={styles.chevronStyle} />
            </Row>
          </StatefulMenuView>
        </View>
      </Grid>
    </Card>
  );
};

const createStyles = ({ spacing, fontSizes, colors }: Theme) =>
  StyleSheet.create({
    container: {
      marginBottom: spacing[4],
    },
    label: {
      fontSize: fontSizes.xs,
      marginBottom: spacing[0.5],
    },
    dropdownText: {
      color: colors.heading,
      fontSize: fontSizes.md,
    },
    chevronStyle: {
      marginLeft: 10,
    },
  });

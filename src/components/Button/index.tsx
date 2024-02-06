import { Text, TouchableOpacity, View } from 'react-native'
import { ButtonT } from '@/src/types/buttonT'
import { clsx } from 'clsx'
import { AntDesign } from '@expo/vector-icons'
export default function Button({
  title,
  onPress,
  isSelected,
  primary,
  secondary,
  icon,
  ...rest
}: ButtonT) {
  return (
    <TouchableOpacity
      className={clsx(
        'h-11 bg-slate-800 items-center justify-center rounded-md px-4 flex-row',
        isSelected && 'border-2 border-lime-300',
        primary && 'bg-lime-400',
        secondary && 'bg-slate-900'
      )}
      onPress={onPress}
      {...rest}
    >
      <AntDesign name={icon} size={20} />
      <Text
        className={clsx(
          'ml-1 text-white text-base font-medium',
          primary && 'text-black'
        )}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

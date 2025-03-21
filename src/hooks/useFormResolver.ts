import { useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import { z, ZodType, ZodTypeDef, ZodObject, ZodRawShape } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export function useFormResolver<TSchema extends ZodType<any, ZodTypeDef, any>>(
  schema: TSchema,
  options?: Omit<UseFormProps<z.infer<TSchema>>, 'resolver' | 'defaultValues'>
): UseFormReturn<z.infer<TSchema>> & { resetForm: () => void } {
  // Check if schema is an object and extract fields
  const isObjectSchema = schema instanceof z.ZodObject;
  const parsedDefaults = schema.safeParse({});

  // If parsing fails, set all fields to empty strings or default values
  const defaultValues: z.infer<TSchema> = parsedDefaults.success
    ? parsedDefaults.data
    : isObjectSchema
      ? (Object.fromEntries(
          Object.keys((schema as ZodObject<ZodRawShape>).shape).map((key) => [key, ''])
        ) as z.infer<TSchema>)
      : ({} as z.infer<TSchema>); // Fallback for non-object schemas

  const form = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues,
    ...options,
  });

  const resetForm = () => {
    form.reset(defaultValues);
  };

  return {
    ...form,
    resetForm,
  };
}

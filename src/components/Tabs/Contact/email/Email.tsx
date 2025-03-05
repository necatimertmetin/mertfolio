import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Box, Button } from "@mui/material";
import { IoSend } from "react-icons/io5";
import emailjs from "@emailjs/browser";

type FormValues = {
  from_email: string;
  message: string;
};

export const Email = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState<React.ReactNode>(<IoSend />);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setLoading(true);

    const serviceID = "service_rpg8i4t";
    const templateID = "template_9leeylh";
    const publicKey = "hZMVbS5c0RhAttlCB";

    emailjs
      .send(serviceID, templateID, data, publicKey)
      .then(() => {
        setButtonText("Sent ✅");
        reset();
        setTimeout(() => setButtonText(<IoSend />), 3000);
      })
      .catch(() => {
        setButtonText("Error ❌");
        setTimeout(() => setButtonText(<IoSend />), 3000);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        variant="outlined"
        label="Email"
        type="email"
        {...register("from_email", { required: "Email Required" })}
        error={!!errors.from_email}
        helperText={errors.from_email?.message}
        size="small"
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Message"
        {...register("message", { required: "Message Required" })}
        error={!!errors.message}
        helperText={errors.message?.message}
        size="small"
        multiline
        rows={2}
        fullWidth
        margin="dense"
      />
      <Box display="flex" justifyContent="flex-end" mt={1}>
        <Button
          type="submit"
          variant="contained"
          loading={loading}
          sx={{
            boxShadow: (theme: { custom: { default: any } }) =>
              theme.custom.default,
            background: (theme: { palette: { secondary: { main: any } } }) =>
              theme.palette.secondary.main,
            color: (theme: { palette: { background: { default: any } } }) =>
              theme.palette.background.default,
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
};

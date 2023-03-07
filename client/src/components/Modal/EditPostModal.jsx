import { Button, Grid, TextareaAutosize } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { EditPost } from "@/Apis/vendorApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "70%", md: "40%" },
  minHeight: { xs: "10%", sm: "10%", md: "10%" },
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
  borderRadius: "10px",
};

const EditPostModal = (props) => {
  const [ description, setDescription ] = useState(props.post.description)

  const editPost = (postId)=>{
    const data = {
      postId,
      description
    }
    const res = EditPost(data)
    if (res) {
      props.setRefresh(!props.refresh)
      props.close(false)
    }else{
      // router.push('/404')
    }
  }
  
  return (
    <>
      <Box sx={style}>
        <Grid
          sx={{
            height: "-webkit-fill-available",
            textAlign: "center",
          }}
        >
          <Grid xs={12} sx={{ p: 1 }}>
            <img
              src={props.post.image}
              style={{
                height: "150px",
                borderRadius: "5px",
                border: "1px solid #000",
              }}
              alt=""
            />
          </Grid>
          <Grid xs={12} sx={{ p: 1 }}>
            <TextareaAutosize
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              id=""
              defaultValue={description}
              style={{
                maxWidth: "-webkit-fill-available",
                minWidth: "-webkit-fill-available",
                maxHeight: "150px",
                minHeight: "150px",
                overflowY: "auto",
              }}
            ></TextareaAutosize>
          </Grid>
          <Grid xs={12} sx={{ textAlign: "end" }}>
            <Button
              onClick={()=>props.close(false)}
              sx={{
                pl: 2,
                pr: 2,
                mr: 1,
                backgroundColor: "#1976d2",
                color: "#fff",
                fontWeight: "900",
                fontSize: "12px",
                ":hover": { backgroundColor: "#1976d2" },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={()=>editPost(props.post._id)}
              sx={{
                pl: 2,
                pr: 2,
                mr: 1,
                backgroundColor: "#1976d2",
                color: "#fff",
                fontWeight: "900",
                fontSize: "12px",
                ":hover": { backgroundColor: "#1976d2" },
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default EditPostModal;

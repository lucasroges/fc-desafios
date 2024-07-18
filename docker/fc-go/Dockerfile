# building program

FROM golang AS go

WORKDIR /usr/

COPY fullcycle.go /usr/fullcycle.go

RUN go build fullcycle.go

# running program

FROM scratch

COPY --from=go /usr/fullcycle fullcycle

ENTRYPOINT ["./fullcycle"]
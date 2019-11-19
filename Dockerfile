FROM alpine:3.9

ENV NODE_VERSION 12.13.0

LABEL com.github.actions.name="kintone-ui-component auto"
LABEL com.github.actions.description="Run automation for kintone-ui-component"
LABEL com.github.actions.icon="aperture"
LABEL com.github.actions.color="green"

RUN apk add chromium
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]

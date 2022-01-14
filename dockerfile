FROM debian:buster

#update the package index
RUN apt-get update
RUN apt-get upgrade -y

#install the packages nodejs and npm
RUN apt-get install -y nodejs npm
RUN npm install -g n
RUN apt-get install -y build-essential
RUN apt-get install -y wget git unzip zip curl 
RUN npm install -g typescript


#install nestjs
RUN n stable
RUN npm install -g nestjs
RUN npm i -g @nestjs/cli
RUN git clone https://github.com/Hamzaelkhatri/ponggame.git /ponggame

RUN cd /ponggame

RUN apt install zsh -y

ENTRYPOINT sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"